<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::getTodos(JWTAuth::user()->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required|max:255', 'todo_group_id' => 'required']);

        return Todo::create([
            'name' => $request->get('name'),
            'user_id' => JWTAuth::user()->id,
            'todo_group_id' => $request->get('todo_group_id'),
            'priority' => $request->get('priority'),
            'due_date' => $request->get('due_date'),
            'description' => ''
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Todo::where('user_id', JWTAuth::user()->id)->where('id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'max:255'
        ]);

        $validator->after(function($validator) use($todo) {
            if($todo->user_id != JWTAuth::user()->id)
            {
                $validator->errors()->add('user_id', 'Not owner of this resource');
            }
        });
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $todo->update($request->all());
        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Todo::where('user_id', JWTAuth::user()->id)->where('id', $id)->delete();
    }

    public function getPriorities() {
        return json_encode(Todo::getPriorities(), JSON_FORCE_OBJECT);
//        return Todo::getPriorities();
    }
}
