<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public array $priority_list = [
        0 => "Minor",
        1 => "Medium",
        2 => "High",
        3 => "Critical"
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
}
