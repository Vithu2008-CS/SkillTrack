<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AsgardeoAuthController extends Controller
{
    public function redirectToAsgardeo()
    {
        session(['oauth_state' => $state = Str::random(40)]);

        $query = http_build_query([
            'client_id'     => env('ASGARDEO_CLIENT_ID'),
            'redirect_uri'  => env('ASGARDEO_REDIRECT_URI'),
            'response_type' => 'code',
            'scope'         => 'openid profile email',
            'state'         => $state,
        ]);

        return redirect(env('ASGARDEO_BASE_URL') . '/oauth2/authorize?' . $query);
    }

    public function handleAsgardeoCallback(Request $request)
    {
        $state = $request->session()->pull('oauth_state');

        if (empty($state) || $state !== $request->state) {
            return redirect('/')->with('error', 'Security check failed: Invalid state.');
        }

        // Using local verification bypass helper just in case your local PHP environment lacks updated root SSL certs
        $response = Http::withoutVerifying()->asForm()->post(env('ASGARDEO_BASE_URL') . '/oauth2/token', [
            'grant_type'    => 'authorization_code',
            'client_id'     => env('ASGARDEO_CLIENT_ID'),
            'client_secret' => env('ASGARDEO_CLIENT_SECRET'),
            'redirect_uri'  => env('ASGARDEO_REDIRECT_URI'),
            'code'          => $request->code,
        ]);

        if ($response->failed()) {
            return redirect('/')->with('error', 'Token exchange failed.');
        }

        $tokens = $response->json();

        // Authenticational profile decoding or database synchronization can happen here later
        
        return redirect('/')->with('success', 'Welcome to SkillTrack! Logged in via Asgardeo.');
    }
}