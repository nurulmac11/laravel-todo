<?php

namespace App\Console\Commands;

use App\Models\Todo;
use Illuminate\Console\Command;

class FakeGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fake-generator {--countTodos=} {--countTodosCompleted=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        print("I AM HERE? ????");
        $todoCount = $this->option('countTodos');
        $completedTodo = $this->option('countTodosCompleted');

        Todo::factory()->count($completedTodo)->withCompleted()->create();
        Todo::factory()->count($todoCount - $completedTodo)->withIncompleted()->create();
    }
}
