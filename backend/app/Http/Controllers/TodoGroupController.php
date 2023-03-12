<?php

namespace App\Http\Controllers;

use App\Models\TodoGroup;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class TodoGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TodoGroup::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required|unique:todo_groups|max:255']);

        return TodoGroup::create([
            'name' => $request->get('name'),
            'user_id' => JWTAuth::user()->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return TodoGroup::where('user_id', JWTAuth::user()->id)->where('id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $todo = TodoGroup::find($id)->where('user_id', JWTAuth::user()->id);
        $todo->update($request->all());
        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return TodoGroup::where('user_id', JWTAuth::user()->id)->where('id', $id)->delete();
    }
}
