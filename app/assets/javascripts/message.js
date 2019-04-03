$(function(){
   function buildHTML(message){

   var image = "";

    image = (message.image) ? `<img src="${ message.image }">`: " ";


    var html = `<div class="message" data-id = ${message.id} >

                  <div class="upper-message">

                   <div class="upper-message__user-name">
                       ${message.name}
                   </div>
                   <div class="upper-message__date">
                      ${message.created_at}
                   </div>
                  </div>
                 <div class="lower-meesage">
                  ${ message.content }
                    <p class="lower-message__content">
                     ${ image }

                    </p>
                  </div>
               </div>`
   return html;
  }


  $('#new_message').on("submit", function(e){
      e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
   .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);


      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message').prop('disabled', false);
      $(".form__submit").removeAttr("disabled");
      $('.new_message')[0].reset();
    })


    .fail(function(){
      alert('入力してください');
      $('.form__submit').prop('disabled', false);
    });
   });



    // 自動更新
    var interval = setInterval(function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
        var message_id = $('.message:last').data('id');

        $.ajax({
          url: location.href,
          type: "GET",
          data: {id: message_id},
          dataType: "json"
        })
        .done(function(data) {
          data.forEach(function(message) {
            var html = buildHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
            $('.new_message .message').val('');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      } else {
          clearInterval(interval);
        }
    } , 2000 );
});
