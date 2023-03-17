<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TodoGroup>
 */
class TodoGroupFactory extends Factory
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
            'user_id' => User::factory(),
        ];
    }
    public function withUser($id)
    {
        return $this->state([
            'name' => fake()->name(),
            'user_id' => $id,
        ]);
    }
}
