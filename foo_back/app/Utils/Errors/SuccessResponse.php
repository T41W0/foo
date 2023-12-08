<?php

namespace App\Utils\Errors;

use Illuminate\Http\Response;


class SuccessResponse extends Response {

    public function __construct($content) {
        parent::__construct($content, 200);
    }

}