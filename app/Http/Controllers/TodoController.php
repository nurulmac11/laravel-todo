<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::where('user_id', JWTAuth::user()->id)->get();
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
            'todo_group_id' => $request->get('todo_group_id')
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
    public function update(Request $request, string $id)
    {
        $this->validate($request, ['name' => 'max:255']);

        $todo = Todo::find($id)->where('user_id', JWTAuth::user()->id);
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
}
