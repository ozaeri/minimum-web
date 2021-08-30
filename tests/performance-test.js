//必要なコンポーネント読み込み
const fetch = require("node-fetch");
const { performance } = require('perf_hooks');

//APIのURL
const base_url = "https://script.google.com/macros/s/AKfycbx2yRBfrP0hX2iQ61G8UNkE1tHUzkOSEoxMjK6eHVEtY-I9tHvF3n-IrY5jYS2SJ-X9/exec";

//各種変数
const loop = 3; //ループ回数
let sumTime = 0; //合計時間

//計測処理
(async () => {

    //ループ
    for (let i = 0; i < loop; i++) {

        //開始時間取得
        const startTime = performance.now();

        //リクエスト
        const response = await fetch(base_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`email=test@tset.local&body=aaa&channel=performance-test`)
        });
        const text = await response.text(); //textで返す
        console.log(text); //コンソールに出力

        //終了時間取得
        const endTime = performance.now();

        //レスポンス時間計測（ミリ秒を秒に直す）
        const responseTime = (endTime - startTime) / 1000;
        //合計時間を合算
        sumTime += responseTime;
        //レスポンジ時間出力
        console.log(responseTime);
    }

    //平均出力
    console.log("ave=" + sumTime / loop);

})();