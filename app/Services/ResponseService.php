<?php
namespace App\Services;

class ResponseService
{
    public static function toArray($status, $message, $data = null, $errors = null) {
        return [
            'status' => $status,
            'message' => $message,
            'data' => $data,
            'errors' => $errors
        ];
    }

    public static function toJson($response, $statusCode = 200) {
        return response()->json($response, 200);
    }

    public static function validatorError($errors) {
        return [
            'status' => false,
            'message' => 'Validator Error',
            'data' => null,
            'errors' => $errors
        ];
    }
}
