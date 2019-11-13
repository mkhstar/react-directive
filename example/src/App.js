import React, { Component } from 'react';
import ReactDirective from 'react-directive';

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactDirective>
          <div className="App">
          <div data-react-for={['Musah', 'Kusi', 'Hussein']}>{name => `His name is ${name}`}</div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              itaque.
            </p>
            <p data-react-if={false}>This paragraph is not rendered</p>
            <div data-react-if={true}>
              This div is rendered{' '}
              <span data-react-if={true}>
                Span <span data-react-if={false}>Dont render</span>
              </span>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                provident deserunt vel necessitatibus omnis iste obcaecati
                exercitationem architecto maxime! Nobis.
              </p>
              <div>
                <div>
                  <p data-react-if={false}>Dont render</p>
                </div>
              </div>
            </div>
            <div data-react-for={5}>
                Repeat 5 times
            </div>
            <p data-react-for={5}>{val => 'val'}</p>
            <div data-react-for={10}>
              This is repeated 10 times
              <div data-react-for={['musah', 'ahmet', 'emre']}>
                {val => {
                  return <span>His name is {val}</span>;
                }}
              </div>
            </div>

            <p data-react-for={{ name: 'Musah', dateOfBirth: 'January, 1996' }}>
              {(val, k, ind) => `${k}: ${val}`}
            </p>
            <ul>
              <li data-react-for={['pineapple', 'pear']}>
                Repeat this twice
                <span data-react-for={2}>3 times</span>
              </li>
            </ul>
            <p data-react-for={['pineapple', 'pear']}>
              {(iter, index) => {
                return (
                  <span style={{ display: 'block' }} key={index}>
                    <span>You are a star {iter}</span>
                    <span
                      style={{ display: 'block' }}
                      data-react-for={['one', 'two']}
                    >
                      {(val, i) => {
                        return (
                          <span key={i}>
                            {val}
                            <span data-react-for={[1, 2, 3]}>{n => n}</span>
                          </span>
                        );
                      }}
                    </span>
                  </span>
                );
              }}
            </p>
          </div>
        </ReactDirective>
      </div>
    );
  }
}
