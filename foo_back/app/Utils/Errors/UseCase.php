<?php

namespace App\Http\Controllers\Helpers;

use App\Models\Account;
use App\Models\Bank;
use App\Models\Password;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\callback;

class UseCase
{

    private static function privateKey()
    {
        return "sk_test_d6187cfad43d1922f4e8aed9cdff38501bba21b1";
    }

    public static function createIfNotExist($clazz, $columnKey, $columnValue, $callBack)
    {
        $query = $clazz::where("$columnKey", "=", "$columnValue")->first();
        if (!$query) {
            return call_user_func($callBack, new $clazz);
        }
        return call_user_func($callBack, $query);
    }

    public static function  createPath($path, $callBack)
    {
        $dpaths = explode("/", $path);
        $start = "/";
        foreach ($dpaths as $ppath) {
            if ($ppath !== "") {
                $index = '<?php' . "\n\n\n\nheader('Location:/');\n\n\n\n\n" . '?>';
                $start .= $ppath . "/";
                $mpath = public_path($start);
                $mpath = str_replace("\\", "/", $mpath);
                if (file_exists($mpath) === false) {
                    mkdir($mpath);
                    file_put_contents($mpath . "index.php", $index);
                }
            }
        }
        return call_user_func($callBack, $path);
    }

    public static function verifyPayment($paymentRef, $callback)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/transaction/verify/$paymentRef",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer " . self::privateKey(),
                "Cache-Control: no-cache",
            ),
        ));
        $response = json_decode(curl_exec($curl));
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            return new ForbiddenResponse(["message" => "transaction fails with errors $err"]);
        } else {
            if ($response->status) {
                if ($response->data->status) {
                    return call_user_func_array($callback, [$response->data->id, $response->data->status]);
                }
            }

            return new ForbiddenResponse(["message" => "transaction fails with errors $err"]);
        }
    }

    public static function enoughBalance($accountId, $amount, $callback)
    {
        return self::fetchTable(Bank::class, "account", $accountId, [], function ($bank) use ($amount, $callback) {
            if ($amount > $bank->balance) {

                return new ForbiddenResponse(["message" => "You have insufficient balance"]);
            }
            $bank->balance = floatval($bank->balance) - floatval($amount);
            $bank->save();
            return call_user_func($callback);
        }, "invalid account or bank account");
    }

    public static function retrieveAbility($email, $callBack)
    {
        if (in_array($email, ["samuelclinton975@gmail.com", "muvletech@gmail.com"])) {
            return call_user_func($callBack, $email, "admin|master");
        } else {
            return call_user_func($callBack, $email, "auth|user");
        }
    }

    public static function account($userId, $callback)
    {
        $acc = Account::where("user", "=", $userId)->first();
        if (!$acc) {
            return new NotFoundResposnse(["message" => "unknown user, not found!!"]);
        }
        return call_user_func($callback, $acc);
    }
    public static function wallet($accountId, $callback)
    {
        $acc = Wallet::where("account", "=", $accountId)->first();
        if (!$acc) {
            return new NotFoundResposnse(["message" => "wallet, not found!!"]);
        }
        return call_user_func($callback, $acc);
    }

    public static function user($userId, $callback)
    {
        $acc = User::where("id", "=", $userId)->first();
        if (!$acc) {
            return new NotFoundResposnse(["message" => "unknown user, not found!!"]);
        }
        return call_user_func($callback, $acc);
    }
    public static function updateModel($model, $data, $request, $response = "saved")
    {
        foreach ($data as $column => $value) {
            if ($request->has($column)) {
                $model->{$column} = $value;
            }
        }
        $model->save();

        return new SuccessResposnse($model);
    }

    //creates a new table object if table object does not exist
    public static function updateIfExist($tableClazz, $columnkey, $valueKey, $callback)
    {
        $query = $tableClazz::where("$columnkey", "=", "$valueKey")->first();
        if (!$query) {
            $query = new $tableClazz;
        }
        return call_user_func($callback, $query);
    }

    public static function sendMail($email, $emailClazz, $callback)
    {
        try {
            $mail = Mail::to($email)->send($emailClazz);
            return call_user_func($callback, $mail);
        } catch (\Exception $e) {
        } finally {
            return call_user_func($callback, false);
        }
    }

    public static function fetchTable($tableClazz, $columnKey, $columnValue, $with = [], $callback, $error = "table data not
found")
    {
        $query = $tableClazz::where("$columnKey", "=", "$columnValue");
        if (count($with) > 0) {
            for ($i = 0; $i < count($with); $i++) {
                $query = $query->with($with[$i]);
            }
        }
        $query = $query->first();
        if ($query) {
            return call_user_func($callback, $query);
        }
        return new NotFoundResposnse(["message" => $error]);
    }

    public static function validRequest(Request $request, $rules = [], $callback)
    {
        $valid = Validator::make($request->all(), [
            ...$rules
        ]);
        if ($valid->fails()) {
            return new ForbiddenResponse($valid->errors()->all());
        }
        return call_user_func($callback, $request);
    }

    public static function isUserBlocked(User $user, $callback)
    {
        if ($user->canLogin) {
            return call_user_func($callback);
        }
        return new ForbiddenResponse(["message" => "your account is currently under restriction! if this is a mistake
    contact admin"]);
    }

    public static function validatePassword(Request $request, $userid, $callback, $error = "invalid password user
    combinations")
    {
        $password = Password::where("user", "=", $userid)->first();
        if ($password) {
            if (Hash::check($request->password, $password->current)) {
                return call_user_func($callback, $request);
            }
        }
        return new ForbiddenResponse(["message" => $error]);
    }

    public static function validateNewPassword($password, $hash, $callback, $error = "choose a new password, you used
    this password before")
    {

        if (Hash::check($password, $hash)) {
            return new ForbiddenResponse(["message" => $error]);
        }
        return call_user_func($callback);
    }

    public static function tableColumnExist($tableClass, $ownKey, $columnKey, $callback, $error = "cannot find in data
    table")
    {
        $query = $tableClass::where("$ownKey", "=", $columnKey)->first();
        if (!$query) {
            return new NotFoundResposnse(["message" => $error]);
        } else {
            return call_user_func($callback, $query);
        }
    }
}
