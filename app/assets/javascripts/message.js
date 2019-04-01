$(function(){
   function buildHTML(message){

   var image = "";

    image = (message.image) ? `<img src="${ message.image }">`: " ";


    var html = `<div class="message">
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
      $('.form__message').val('');

      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message').prop('disabled', false);
      $(".form__submit").removeAttr("disabled");
      $('.hidden').val('');
    })


    .fail(function(){
      alert('入力してください');
      $('.form__submit').prop('disabled', false);
    });
   });
  });
