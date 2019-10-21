package com.bulingo.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.icu.text.IDNA;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.bulingo.Database.APICLient;
import com.bulingo.Database.APIInterface;
import com.bulingo.Exercises.Exercise;
import com.bulingo.Exercises.ExerciseInfo;
import com.bulingo.Exercises.LanguageSelection;
import com.bulingo.MainActivity;
import com.bulingo.Profile.ProfilePage;
import com.bulingo.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginMain extends AppCompatActivity {

    APIInterface apiInterface;
    String username;
    private SharedPreferences preferences;
    private String usernamePref = "PREF_USERNAME";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        apiInterface = APICLient.getClient(getApplicationContext()).create(APIInterface.class);
        preferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        setContentView(R.layout.activity_log_in_main);
        String message = getIntent().getStringExtra("message");
        username = getIntent().getStringExtra("username");
        if(username == null) {
            username = preferences.getString(usernamePref, "User");
        }
        TextView text = findViewById(R.id.textView);
        text.setText(message);

        //If first time login, select a starting language
        if(isNewUser()){
            Intent intent = new Intent(this, LanguageSelection.class);
            startActivity(intent);
        }
    }

    public void onClickLogOutBtn(View view) {
        userLogout();
    }

    public void onClickExercise(View view) {
        Intent intent = new Intent(this, Exercise.class);
        //We need user's currently selected language here.
        ExerciseInfo info = new ExerciseInfo(ExerciseInfo.ExerciseLanguage.FRENCH, ExerciseInfo.ExerciseType.PRACTICE);
        intent.putExtra("info", info);
        startActivity(intent);
    }

    public void onClickLanguageSelect(View view) {
        Intent intent = new Intent(this, LanguageSelection.class);
        startActivity(intent);
    }

    private void userLogout() {

        Call<Void> responseCall = apiInterface.doLogout();

        responseCall.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()) {
                    toast("Successfully logged out.");
                    loggedOut();
                } else {
                    toast("Cannot log out. Please try again.");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                toast("Cannot log out. Please try again.");
            }

        });
    }

    public void toast(String toast){
        Toast.makeText(getApplicationContext(),toast, Toast.LENGTH_SHORT).show();
    }

    public void loggedOut(){
        PreferenceManager.getDefaultSharedPreferences(getApplicationContext()).edit().clear().apply();
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    public boolean isNewUser(){
        return getIntent().getBooleanExtra("isNew", false);
    }

    public void onClickProfilePage(View view) {
        Intent intent = new Intent(this, ProfilePage.class);
        intent.putExtra("username", username);
        startActivity(intent);
    }
}