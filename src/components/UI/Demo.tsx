import React from 'react';

const Demo = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<p> This is Testing</p><ul><li>Hello</li></ul><p>Testing</p><ul><li>First</li></ul><ol><li>Second</li><li>Third</li><li>Fourth</li></ol>',
      }}
    />
  );
};

export default Demo;
