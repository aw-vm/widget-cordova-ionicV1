package io.ionic.starter;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

public class WidgetHandler extends Activity {

    private static int mCounter = 0;
    public static final String PREFS = "prefs";

    // @Override
    // protected void onCreate() {
    //     super.onCreate();

    //     //editing shared preferences
    //     SharedPreferences shared_prefs = getSharedPreferences(PREFS, 0);
    //     SharedPreferences.Editor editor = shared_prefs.edit();
    //     editor.putBoolean("widgetUpdate", true);
    //     editor.apply();
    //     System.out.println("on recieve app widget fired " + mCounter + " times" + shared_prefs.getBoolean("widgetUpdate", false));

    //     startRelatedActivity();
    //     finish();
    // }

    @Override
    protected void onStart() {
        super.onStart();
        mCounter++;
        //editing shared preferences
        SharedPreferences shared_prefs = getSharedPreferences(PREFS, 0);
        SharedPreferences.Editor editor = shared_prefs.edit();
        editor.putBoolean("widgetUpdate", true);
        editor.putInt("conteo", mCounter);
        editor.commit();
        
        System.out.println("on recieve app widget fired " + mCounter + " times" + shared_prefs.getBoolean("widgetUpdate", false));
        
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("extra", "mandando cosas por intent extra");
        intent.setFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
        startActivity(intent);
        finish();
        // startRelatedActivity();
        
    }

    // public void startRelatedActivity() {

    //     


    // }
}