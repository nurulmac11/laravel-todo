<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TodoGroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);


    Route::get('me', [AuthController::class, 'me']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth')->group(function () {
    Route::get('todos/priorities', [TodoController::class, 'getPriorities']);
    Route::get('stats/todo', [StatsController ::class, 'todo_count']);
    Route::get('stats/top-ten', [StatsController ::class, 'top_ten_users']);
    Route::get('stats/group-counts', [StatsController ::class, 'group_cat']);
    Route::get('stats/top5-groups', [StatsController ::class, 'top_five_groups']);
    Route::apiResources([
        'todos' => TodoController::class,
        'todo-groups' => TodoGroupController::class
    ]);
});
