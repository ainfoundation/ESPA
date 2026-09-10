const fs = require('fs');
let content = fs.readFileSync('src/components/FundsView.jsx', 'utf8');

// The JSX text should be: ${funds.usd.toLocaleString()}
content = content.replace(/\\$\\{funds\.usd\.toLocaleString\(\)\\}/g, '${funds.usd.toLocaleString()}');
content = content.replace(/\\$\\ /g, '$ ');

fs.writeFileSync('src/components/FundsView.jsx', content);

let dash = fs.readFileSync('src/components/SummaryDashboard.jsx', 'utf8');
dash = dash.replace(/\\$\\{funds\.usd\.toLocaleString\(\)\\}/g, '${funds.usd.toLocaleString()}');
dash = dash.replace(/\\$\\{totalDonationsUSD\.toLocaleString\(\)\\}/g, '${totalDonationsUSD.toLocaleString()}');
dash = dash.replace(/\\$\\{totalAllocationsUSD\.toLocaleString\(\)\\}/g, '${totalAllocationsUSD.toLocaleString()}');
fs.writeFileSync('src/components/SummaryDashboard.jsx', dash);

console.log("Fixed JSX");
