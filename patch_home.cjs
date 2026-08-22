const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

content = content.replace(
  'return (\n    <>',
  `return (
    <>
      <Helmet>
        <title>ESPA Foundation | From Exclusion to Education</title>
        <meta name="description" content="ESPA Foundation works to bridge the gap in education by providing digital resources and empowering rural communities." />
        <meta property="og:title" content="ESPA Foundation | From Exclusion to Education" />
        <meta property="og:description" content="ESPA Foundation works to bridge the gap in education by providing digital resources and empowering rural communities." />
      </Helmet>`
);

fs.writeFileSync('src/pages/Home.tsx', content);
