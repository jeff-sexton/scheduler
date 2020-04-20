


const WebSocket = jest.fn((payload) => {

  const { id, interview } = payload;

  const response = JSON.stringify({
    type: "SET_INTERVIEW",
    id,
    interview
  })

});

export default WebSocket;


// MessageEvent {
//   isTrusted: true
//   data: "{"type":"SET_INTERVIEW","id":1,"interview":null}"
//   origin: "ws://localhost:8080"
//   lastEventId: ""
//   source: null
//   ports: []
//   userActivation: null
//   type: "message"
//   target: WebSocket {url: "ws://localhost:8080/", readyState: 1, bufferedAmount: 0, onerror: null, onopen: ƒ, …}
//   currentTarget: WebSocket {url: "ws://localhost:8080/", readyState: 1, bufferedAmount: 0, onerror: null, onopen: ƒ, …}
//   eventPhase: 0
//   bubbles: false
//   cancelable: false
//   defaultPrevented: false
//   composed: false
//   timeStamp: 14316.720000002533
//   srcElement: WebSocket {url: "ws://localhost:8080/", readyState: 1, bufferedAmount: 0, onerror: null, onopen: ƒ, …}
//   returnValue: true
//   cancelBubble: false
//   path: []
//   __proto__: MessageEvent

// }