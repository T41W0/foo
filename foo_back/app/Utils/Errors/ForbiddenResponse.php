<?php

namespace App\Utils\Errors;

use Illuminate\Http\Response;


class ForbiddenResponse extends Response {

    public function __construct($content = "access forbidden!") {
        parent::__construct($content, 403);
    }

}