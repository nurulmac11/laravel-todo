<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Todo extends Model
{
    use HasFactory;

    static public array $priority_list = [
        1 => "Minor",
        2 => "Medium",
        3 => "High",
        4 => "Critical"
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'user_id',
        'todo_group_id',
        'priority',
        'completed',
        'due_date'
    ];

    protected $appends = ['priority_string'];

    public function getPriorityStringAttribute()
    {
        if (!array_key_exists('priority', $this->attributes)) {
            return '';
        }
        $value = $this->attributes['priority'];
        if (is_int($value)) {
            return TODO::$priority_list[$value];
        }
        return $value;
    }



    static public function getTodos(int $user_id)
    {
        return Todo::select(
            ['todo_groups.name as group_name', 'todos.name as title',
                "todos.id",
                "todos.description",
                "todos.user_id",
                "todos.todo_group_id",
                "todos.priority",
                "todos.completed",
                "todos.due_date",
                "todos.created_at",
                "todos.updated_at",
            ]
        )
            ->join('todo_groups', 'todo_groups.id', '=', 'todos.todo_group_id')
            ->orderBy('todos.id', 'DESC')
            ->where('todos.user_id', $user_id)
            ->get();
    }

    static public function getPriorities() {
        return TODO::$priority_list;
    }

}
