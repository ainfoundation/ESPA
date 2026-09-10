import re

with open("src/components/SummaryDashboard.jsx", "r") as f:
    content = f.read()

content = content.replace("import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';", "import DonationTrendsChart from './DonationTrendsChart';")

# replace the large <div className="bg-white p-6 rounded-2xl... to the end of the div
import_chart_regex = r'<div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm mt-8">.*?</ResponsiveContainer>.*?</AreaChart>.*?</div>\s*</div>\s*</div>'
content = re.sub(
    r'<div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm mt-8">.*?</div>\s*</div>\s*</div>',
    '<DonationTrendsChart transactions={funds.transactions} />\n    </div>\n  );\n}',
    content,
    flags=re.DOTALL
)

with open("src/components/SummaryDashboard.jsx", "w") as f:
    f.write(content)

