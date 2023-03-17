<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::getTodos(JWTAuth::user()->id);
    }

    public function todo_count()
    {
        return Todo::all()->count();
    }

    public function top_ten_users()
    {
        return Todo::select('users.name', 'users.id', DB::raw('count(*) as total'))
            ->join('users', 'users.id', '=', 'todos.user_id')
            ->groupBy("user_id")
            ->orderBy('total', 'DESC')
            ->get();
    }
    # Count of users who has: < 5 groups, 5-15 groups, > 15 groups

    public function group_cat() {
        return TodoGroup::select('users.name', 'users.id', DB::raw('count(*) as total'))
            ->join('users', 'users.id', '=', 'todo_groups.user_id')
            ->groupBy("todo_groups.user_id")
            ->orderBy('total', 'DESC')
            ->get();
    }

    # Top 5 users by count of Groups. Exclude groups whose related ToDos are completed.
    # `UserName` and `Count` columns must be returned.
    public function top_five_groups() {
        return TodoGroup::select('users.name', 'users.id', DB::raw('count(*) as total'))
            ->join('users', 'users.id', '=', 'todo_groups.user_id')
            ->join('todos', 'todos.todo_group_id', '=', 'todo_groups.id')
            ->groupBy("todo_groups.user_id")
            ->orderBy('total', 'DESC')
            ->where('todos.completed', '0')
            ->havingRaw('COUNT(todos.id) > 0')
            ->limit(5)
            ->get();
    }
}
