import re

content = open('src/components/MemberListView.jsx').read()

# Add Plus icon to imports if not there
if "Plus" not in content.split("from 'lucide-react'")[0]:
    content = content.replace("Download,", "Download, Plus,")

# Replace Export to CSV button to include Add button as well
buttons = """
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 border border-stone-200 shadow-sm"
          >
            <Download size={16} /> Export to CSV
          </button>
          <button 
            onClick={() => alert(`Add ${title.replace('s', '')} functionality coming soon.`)}
            className="px-4 py-2 bg-[#004B36] hover:bg-[#003828] text-white rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
"""

content = re.sub(r'<button\s*onClick=\{handleExportCSV\}[\s\S]*?</button>', buttons.strip(), content)

open('src/components/MemberListView.jsx', 'w').write(content)
