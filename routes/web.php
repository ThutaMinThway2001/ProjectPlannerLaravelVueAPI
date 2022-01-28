<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/add-project', function () {
    return view('app');
});

Route::get('/edit-project/{projec}', [ProjectController::class, 'edit']);
