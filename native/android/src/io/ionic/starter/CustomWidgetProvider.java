package io.ionic.starter;

import android.widget.RemoteViews;
import android.content.Intent;
import android.app.PendingIntent;
import android.content.Context;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;

public class CustomWidgetProvider extends AppWidgetProvider {
    private static final String ACTION= "WIDGET_ACTION";
    public static final String PREFS = "prefs";
    private static int mCounter = 0;

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.test_widget_layout);

        Intent intent = new Intent(context, WidgetHandler.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // In widget we are not allowing to use intents as usually. We have to use PendingIntent instead of 'startActivity'
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
        views.setOnClickPendingIntent(R.id.appwidget_img, pendingIntent);

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }


}