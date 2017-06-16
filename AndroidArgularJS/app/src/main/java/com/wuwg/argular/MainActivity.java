package com.wuwg.argular;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.webview);

        loadLocalHtmlFile();
    }

    private void loadLocalHtmlFile() {
        //不使用android默认浏览器打开Web，就在App内部打开Web
        webView.loadUrl("file:///android_asset/index.html");
//        webView.setWebViewClient(new WebViewClient() {
//            @Override
//            public boolean shouldOverrideUrlLoading(WebView view, String url) {
//                view.loadUrl(url);
//                return true;
//            }
//        });

//        //支持App内部JavaScript交互
//        webView.getSettings().setJavaScriptEnabled(true);
//
//        //自适应屏幕
//        webView.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
//        webView.getSettings().setLoadWithOverviewMode(true);
//        //设置可以支持缩放
//        webView.getSettings().setSupportZoom(true);
//        //扩大比例的缩放
//        webView.getSettings().setUseWideViewPort(true);
//        //设置是否出现缩放工具
//        webView.getSettings().setBuiltInZoomControls(true);
    }
}
