<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SkillController;

use App\Http\Controllers\AsgardeoAuthController;

Route::get('/auth/redirect', [AsgardeoAuthController::class, 'redirectToAsgardeo'])->name('asgardeo.redirect');
Route::get('/auth/callback', [AsgardeoAuthController::class, 'handleAsgardeoCallback'])->name('asgardeo.callback');

Route::get('/', [SkillController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [SkillController::class, 'index']);
Route::post('/milestones/{milestone}/toggle', [SkillController::class, 'toggleMilestone'])->name('milestones.toggle');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
