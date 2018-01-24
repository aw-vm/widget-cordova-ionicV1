### Creación de Home Screen Widget y Today Extension para proyectos en Cordova

Este es un repositorio guia para crear un widget desde cero en android y en ios. Aqui se encuentra la estructura principal del proyecto y el contenido de los archivos que se deben añadir. Para que widget funcione se requiere que se modifiquen los archivos de info.plist y AndroidManifest.xml directamente en los platforms.

En este caso funciona para abrir vistas y pasar datos a una app de ionic/cordova desde un widget. El flujo de datos seria de la siguiente manera:

- Desde widget nativo se captura el evento de click y se guarda en cache `true` con una llave `widgetClicked` como una señal de que se ha dado click en widget. 
- En el click se abre la actividad o vista principal generada por Cordova y se verifica si `widgetClicked` es verdadero.
- Si es verdadero se pasa a la vista correspondiente y se le asigna `false`.

### Pasos para implementación.

- Instalar Cordova-plugin-ace
- Instalar Cordova-plugin-app-preferences
- Ir a la carpeta native que se crea con ace.

## Android

- Crear una carpeta que se llame res, dentro carpetas de layout, xml y drawable.
- En la carpeta xml crear un archivo `test_widget_info.xml`. Este contiene las config iniciales del widget.
- En la carpeta layout crear un archivo `test_widget_layout.xml`. Este contiene el diseño principal del widget.
- Añadir archivos extras (fotos - formas) a la carpeta drawable.
- En este caso `camera.png` y `circle.xml`
- En src dentro de native android creamos una estructura de carpetas igual a la que contiene el main activity en android. Para esto te puedes fijar en el `config.xml` la id del proyecto. En este caso `id=io.ionic.starter` por lo tanto `MainActivity.java` se va a encontrar en la ruta `io/ionic/starter/`
- Dentro de esta carpeta añadimos una clase llamada `CustomWidgetProvider.java` el cual va a contener la lógica de nuestro widget. En este caso nuestro widget debe abrir `WidgetHandler.java` la cual es una actividad invisible que se va a encargar de hacer las funciones que no puede widget directamente.
- Añadimos también una clase llamada `WidgetHandler.java` la cual hereda de activity y va realizar las funciones en el `@onStart` (es decir cuando se haga click en widget). En este caso vamos a guardar un dato en system preferences. Esta actividad debe ser de tipo singleInstance.
- Por ultimo, en `platforms/android/AndroidManifest.xml` añadimos las siguientes configuraciones dentro del tag `<application>`

````
<activity android:launchMode="singleInstance" android:name="WidgetHandler" />
<receiver android:label="Emergencia" android:name="io.ionic.starter.CustomWidgetProvider">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
<meta-data android:name="android.appwidget.provider" android:resource="@xml/test_widget_info" />
</receiver>
````

## IOS

- Abrir `platforms/ios` en xcode.
- En `General -> targets` damos click en el `+` para añadir un nuevo target y elegimos `today extension`.
- Click a next y añadimos un nombre a nuestra nueva extension, en este caso se llama `widget`.
- click en cancel para no activar el `today scheme`.
- Luego en `targets -> widget`, en `Build phases -> link binary with libraries` añadimos `libCordova.a`.
- En el target de la aplicación, en este caso `MyApp`, buscamos `capabilities` y encendemos la opción de `app groups`. Añadimos un nuevo grupo. El nombre debe ser único así que la mejor opción es utilizar el `bundle identifier`.
- Vamos al `targets -> widget` y también activamos la opción de `app groups` y seleccionamos el mismo grupo que hemos creado anteriormente.
- En el archivo `info.plist` de nuestra aplicación (en este caso `MyApp-info.plist`) añadimos el siguiente fragmento para identificar la app como una url. (Para añadir código en Xcode damos click derecho, `open as - source code`)

````
(Añadir este fragmento después del primer tag de <dict>)
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLName</key>
        <string>testing.widget.v1</string>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>main-view-controller</string>
        </array>
      </dict>
    </array>
````

- Abrimos el archivo MainInterface.storyboard y añadimos un botón dentro de la view.
- Activamos la opción de asistant editor y presionamos control click en el botón, y arrastramos hasta el editor para crear una conexión dentro del TodayViewController.swift. Esta conexión va a ser de tipo action.
- En TodayViewController.swift creamos una variable global para guardar los user defaults. 
- Dentro de la función del botón guardaremos ‘widgetClicked’ true y llamaremos la url que asignamos en info.plist de la app para poder abrirla.

No olvides copiar la carpeta `widget` a `native/ios`.

## IONIC / CORDOVA

En este punto solo nos falta obtener los datos que guardamos en las plataformas nativas y para esto necesitamos el plugin de `Cordova-plugin-app-preferences` que instalamos anteriormente.

Lo ideal seria construir un servicio con una función desde donde se puedan obtener los datos de system preferences y user defaults con el plugin. Esta función se debe llamar desde los eventos `ready` y `resume` de Cordova teniendo en cuenta cada una de las plataformas para verificar si el dato ha cambiado. También podrían utilizar el mismo nombre de suite y parámetro para system prefs y user defaults.

