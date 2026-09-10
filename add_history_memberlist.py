import re

content = open('src/components/MemberListView.jsx').read()

history_section = """
                  <div className="flex gap-3 md:col-span-2 mt-4 pt-4 border-t border-stone-100">
                    <History className="text-stone-400 mt-0.5" size={18} />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">History</div>
                      <div className="text-sm font-medium text-stone-900 mt-1">{selectedMember.history || 'No history available.'}</div>
                    </div>
                  </div>
"""

# add History to lucide-react import
if "History" not in content.split("from 'lucide-react'")[0]:
    content = content.replace("Eye,", "Eye, History,")

content = content.replace("                <div className=\"pt-4 border-t border-stone-100 flex justify-end\">", history_section + "\n                <div className=\"pt-4 border-t border-stone-100 flex justify-end\">")

open('src/components/MemberListView.jsx', 'w').write(content)
