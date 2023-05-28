
// 付箋データを格納する配列を作成
const stickyNotes = [];

        // ページのDOMツリーを読み込む
        $(document).ready(function () {

            //  気づきを保存するボタンを非表示
            $('#dataSave').hide();
            //  投稿した気づきを削除するボタンを非表示
            $('#stickyNoteDelete').hide();
            // //  保存内容を消去するボタンを非表示
            // $('#dataClear').hide();



            
            //  ローカルストレージにデータが保存されている場合は保存内容を呼び出すボタンを表示
            if (localStorage.length > 0) {
                $('#dataLoad').show();
                $('#dataClear').show();
            } else {
                $('#dataLoad').hide();
                $('#dataClear').hide();
            }

 
            // 入力したテキストを出力する
            $('#stickyNoteAdd').on('click', function () {

                // 入力されたタイトルと内容を取得
                const stickyNoteTitle = $('#stickyNote__Title').val();
                const stickyNoteText = $('#stickyNote__Text').val();
                // 投稿した日付を取得
                const postDate = new Date();
                const year =postDate.getFullYear();
                const month =postDate.getMonth()+1;
                const day = postDate.getDate();
                const stickyNoteDate = `${year}年${month}月${day}日`;
                // 付箋の座標
                let x = 0;
                let y = 0;
        
                // タイトルと内容が空の場合は処理を中断
                if (stickyNoteTitle === '' || stickyNoteText === '') {
                    $('#status').html('気づきが未入力です');
                }
                else {
                    // stickyNoteTitleとstickyNoteTextをオブジェクトstickNoteDataに格納
                    const stickyNoteData = {
                        title: stickyNoteTitle,
                        text: stickyNoteText,
                        date: stickyNoteDate,
                    };
                    // 付箋データを配列の最後に追加
                    stickyNotes.push(stickyNoteData)

                    // 付箋のhtml要素を生成する関数
                    $('#stickyNote__container').append('<div class="stickyNote">' + '<h4>' + stickyNoteData.title + '</h4>' + '<p>' + stickyNoteData.text + '</p>' + '<p class="postdate">' + `${year}年${month}月${day}日` + '</p>' + '</div>').hide().fadeIn(1000);
                    // 付箋の追加後は入力したテキストをクリア
                    $('#stickyNote__Title').val('');
                    $('#stickyNote__Text').val('');
                    $('#status').html('気づきを追加しました');
                }

                //  付箋をドラッグさせる
                $('.stickyNote').draggable({
                    containment: '#stickyNote__container',
                    stop:function(e, ui) { 
                        console.log(ui.position.top +'と'+ ui.position.left);
                        console.log(ui.offset.top+'と'+ui.offset.left);
                        console.log(e);
                    }
                });

                // 付箋が作成されたら実行
                if (stickyNotes.length > 0) {
                    // 保存ボタンを表示
                    $('#dataSave').show();
                    // 削除ボタンを表示
                    $('#stickyNoteDelete').show();
                }
                
            });

            // 投稿した気づきを削除する
            $('#stickyNoteDelete').on('click', function () {
                // 付箋のhtml要素を削除
                $('#status').html('投稿した気づきを削除しました');
                $('.stickyNote').remove();
                //付箋データの配列を空にしないと、付箋を削除しても、付箋追加の配列が空にならない
                stickyNotes.length = 0;
            });


            // ローカルストレージに保存
            $('#dataSave').on('click', function () {
                //  データが保存されているかチェックし。保存されている場合は削除
                if (localStorage.length > 0) {
                    // localStorageのキーを取得し、配列keyに格納
                    const keys = Object.keys(localStorage)
                    // localStorageの要素数がiより大きい間は繰り返す
                    for (let i = 0; i < keys.length; i++) {
                        // もし、keyの値がtitleで始まるかtextで始まる場合localStorageに格納されているデータを削除
                        if(keys[i].startsWith('title')||keys[i].startsWith('text')||keys[i].startsWith('date')){
                            localStorage.removeItem(keys[i]);
                        }
                    }
                }

                // 配列stickyNotesの要素数がiより大きい間は保存繰り返す
                for (let i = 0; i < stickyNotes.length; i++) {

                    const stickyNoteTitle = stickyNotes[i].title;
                    const stickyNoteText = stickyNotes[i].text;
                    const stickyNoteDate = stickyNotes[i].date;
                    
                    // localStorageにデータを保存
                    localStorage.setItem('title' + i, stickyNoteTitle);
                    localStorage.setItem('text' + i, stickyNoteText);
                    localStorage.setItem('date' + i, stickyNoteDate);
                    // console.log(localStorage);
                }
                $('#status').html('投稿した気づきを保存しました');
                // ロードボタンを表示
                $('#dataLoad').show();
                // 保存ボタンを非表示
                $('#dataSave').hide();
            });


            // ローカルストレージの保存データを削除
            $('#dataClear').on('click', function () {

                //  データが保存されているかチェック
                if (localStorage.length > 0) {

                    // localStorageのキーを取得し、配列keyに格納
                    const keys = Object.keys(localStorage)

                    // localStorageの要素数がiより大きい間は繰り返す
                    for (let i = 0; i < keys.length; i++) {
                        // もし、keyの値がtitleで始まるかtextで始まる場合localStorageに格納されているデータを削除
                        if(keys[i].startsWith('title')||keys[i].startsWith('text')|keys[i].startsWith('date')){
                            localStorage.removeItem(keys[i]);
                        }
                    }
                    $('#status').html('データを削除しました');
                     // 保存ボタンを表示
                    $('#dataSave').show();
                    // ロードボタンを非表示
                    $('#dataLoad').hide();
                    // データ削除ボタンを非表示
                    $('#dataClear').hide();
                }
                else {
                    $('#status').html('保存されているデータはありません');
                }
                //付箋データの配列を空にしないと、付箋を削除しても、付箋追加の配列が空にならない
                stickyNotes.length = 0;

            });



            // ローカルストレージのデータをロード
            $('#dataLoad').on('click', function () {

                //  データが保存されているかチェック
                if (localStorage.length > 0) {
                    $('#status').html('データを復元しました');
                    // 現在表示されている付箋を削除
                    $('.stickyNote').remove();

                    // localStorageのキーを取得し、配列keyに格納
                    const keys = Object.keys(localStorage)

                    // localStorageの要素数がiより大きい間は繰り返す
                    for (let i = 0; i < keys.length; i++) {

                        // keys[i]が'title'で始まっていたら以下実行
                        if (keys[i].startsWith('title')) {
                            // 配列keysに格納された、localStorageのkeyの値；title直後の数字を取得
                            const index = keys[i].substring(5);
                            // localStorageのデータを取得し、変数titleとtextに格納
                            const title = localStorage.getItem('title' + index);
                            const text = localStorage.getItem('text' + index);
                            const date = localStorage.getItem('date' + index);
                            console.log(title);
                            $('#stickyNote__container').append(`<div class="stickyNote"><h4>${title}</h4><p>${text}</p><p class="postdate">${date}</p></div>`);
                        }
                    }
                    //  付箋をドラッグさせる
                    $('.stickyNote').draggable({containment: '#stickyNote__container'});

                    // ロードボタンを非表示
                    $('#dataLoad').hide();
                    // データ削除ボタンを表示
                    $('#dataClear').show();
                }
                else {
                    $('#status').html('保存されたデータはありません');
                }
            });
        });