<?php

namespace App\Utils\Errors;

use Illuminate\Http\Response;


class NotFoundResponse extends Response {

    public function __construct($content = "not found!") {
        parent::__construct($content, 404);
    }

}