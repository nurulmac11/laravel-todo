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
        $user = User::factory()->create();
        return [
            'name' => fake()->name(),
            'description' => '',
            'user_id' => $user,
            'todo_group_id' => TodoGroup::factory()->withUser($user),
            'priority' => fake()->numberBetween(1,3),
            'completed' => 0,
            'due_date' => "2023-03-21"
        ];
    }

    public function withCompleted(): Factory
    {
        return $this->state(function (array $attributes) {
            $user = User::factory()->create();
            return [
                'name' => fake()->name(),
                'description' => '',
                'user_id' => $user,
                'todo_group_id' => TodoGroup::factory()->withUser($user),
                'priority' => fake()->numberBetween(1,3),
                'completed' => 1,
                'due_date' => "2023-03-21"
            ];
        });
    }

    public function withIncompleted(): Factory
    {
        return $this->state(function (array $attributes) {
            $user = User::factory()->create();
            return [
                'name' => fake()->name(),
                'description' => '',
                'user_id' => $user,
                'todo_group_id' => TodoGroup::factory()->withUser($user),
                'priority' => fake()->numberBetween(1,3),
                'completed' => 0,
                'due_date' => "2023-03-21"
            ];
        });
    }


}
