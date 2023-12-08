<?php

namespace App\Utils\Errors;

use Exception;

class UploadError extends Exception {

    public function __construct($message = "uploading file failed", $code = 403, $previous = null) {
        parent::__construct($message, $code, $previous);
    }

}