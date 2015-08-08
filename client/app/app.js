angular
  .module( 'sundayCookClub', ['btford.socket-io'] )
  .factory( 'socketService', function( socketFactory ) {
    return socketFactory();
  })
  .controller( 'ChatController', function( socketService ) {
    // save reference to this
    var vm = this;

    // temporary container for chats
    vm.chats = [];

    // Controller methods
    function sendChat(chat) {
      socketService.emit('new chat', vm.chatText);
      vm.chatText = '';
    }

    // Socket events
    socketService.on( 'new chat', function(newChat) {
      vm.chats.push(newChat);
      console.log('New chat received from the server: ', newChat);
      console.log(vm.chats);
    });

    // make methods available in the view
    vm.sendChat = sendChat;
  });