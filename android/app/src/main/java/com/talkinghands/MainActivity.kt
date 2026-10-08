package com.talkinghands

import android.os.Bundle
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "talkinghands"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableFullScreen()
  }

  /**
   * Hide the status and navigation bars (sticky immersive). Re-applied whenever
   * the window regains focus, which also covers the bars being swiped in and
   * auto-hiding again.
   */
  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) {
      enableFullScreen()
    }
  }

  private fun enableFullScreen() {
    WindowCompat.setDecorFitsSystemWindows(window, false)
    WindowInsetsControllerCompat(window, window.decorView).apply {
      hide(WindowInsetsCompat.Type.systemBars())
      systemBarsBehavior =
          WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    }
  }
}
