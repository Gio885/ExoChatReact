import React from "react";
import Webcam from "react-webcam"
import '../custom/VideoChatPage.css'
export default class VideoChatPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    };
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  }

  render() {
    return (
      <div>
        <h1>react-webcam</h1>
        <Webcam
          ref={node => this.webcam = node}
        />
        <div>
          <h2>CSS Filters & style prop</h2>
          <div className='webcams'>
            <Webcam
              width='212'
              height='160'
            />
            <Webcam
              width='212'
              height='160'
              style={{ transform: 'rotate(180deg)' }}
            />
            <Webcam
              width='212'
              height='160'
            />
            <Webcam
              width='212'
              height='160'
              style={{ transform: 'rotate(180deg)' }}
            />
            <Webcam
              width='212'
              height='160'
            />
            <Webcam
              width='212'
              height='160'
              style={{ transform: 'rotate(180deg)' }}
            />
            <Webcam
              width='212'
              height='160'
            />
            <Webcam
              width='212'
              height='160'
              style={{ transform: 'rotate(180deg)' }}/>
            <Webcam
              width='212'
              height='160'
            />
          </div>
        </div>
        <div>
          <h2>Screenshot (via ref)</h2>
          <div className='screenshots'>
            <div className='controls'>
              <button onClick={this.handleClick}>capture</button>
            </div>
            {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
          </div>
        </div>
        <div>
          <h2>Screenshot (via render props)</h2>
          <div className='screenshots'>
            <Webcam
          >
            {({ getScreenshot }) => (
              <button
                onClick={() => {
                  const screenshot = getScreenshot()
                  this.setState({ screenshot });
                }}
              >
                Capture photo
              </button>
            )}
          </Webcam>
          </div>
        </div>
      </div>
    );
  }
}
