<?php

namespace Database\Factories;

use App\Models\TodoGroup;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => '',
            'user_id' => User::factory(),
            'todo_group_id' => TodoGroup::factory(),
            'prioririty' => 1,
            'completed' => 0,
            'due-date' => "12/12/2023"
        ];
    }

}
