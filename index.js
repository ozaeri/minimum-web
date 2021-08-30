const email = document.getElementById("email");
const body = document.getElementById("body");
const btn = document.getElementById("btn");

const email_error = document.getElementById("email-error");
const body_error = document.getElementById("body-error");

//エラー処理
//emailのルール：小文字英字または数字または.で始まり、@が含まれ、その後に小文字英字または数字または.、.が含まれ、その後に小文字英字のパターン
const email_exp = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/;
//bodyのルール：1文字以上10文字以下
const body_exp = /^.{1,10}$/;


btn.addEventListener("click", (e) => {
    e.preventDefault(); //フォームの内容を指定したURLへ送信する動作を防止

    // //チェック前に一旦hidden
    email_error.classList.add("hidden");
    body_error.classList.add("hidden");

    if (!email_exp.test(email.value)) {
        email_error.classList.remove("hidden"); //赤文字エラーメッセージ表示
    }

    if (!body_exp.test(body.value)) {
        body_error.classList.remove("hidden");//赤文字エラーメッセージ表示
    }

    if (email_error.classList.contains("hidden") && body_error.classList.contains("hidden")) {
        //サーバにデータを送信（{deploy_id}は各自の環境に依存）
        const api_url = "https://script.google.com/macros/AKfycbx2yRBfrP0hX2iQ61G8UNkE1tHUzkOSEoxMjK6eHVEtY-I9tHvF3n-IrY5jYS2SJ-X9/exec";

        fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`email=${email.value}&body=${body.value}&channel=web`)
        })
            .then((response) => {
                response.text().then((text) => {
                    alert(text);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    }
});

//email入力時のkeyupイベントを使って随時バリデーションチェックしてhiddenクラスの表示非表示を管理
email.addEventListener("keyup", (e) => {
    if (email_exp.test(email.value)) {
        email_error.classList.add("hidden");
    } else {
        email_error.classList.remove("hidden");
    }
})

//body入力時のkeyupイベントを使って随時バリデーションチェックしてhiddenクラスの表示非表示を管理
body.addEventListener("keyup", (e) => {
    if (body_exp.test(body.value)) {
        body_error.classList.add("hidden");
    } else {
        body_error.classList.remove("hidden");
    }
})
