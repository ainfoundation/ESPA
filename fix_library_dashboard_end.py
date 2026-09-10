import re
content = open('src/pages/LibraryDashboard.tsx').read()

end_resources = """
        )
      ) : (
        <div className="bg-white rounded-3xl border border-[#004B36]/10 p-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <div key={resource.id} className="p-5 border border-stone-100 rounded-2xl hover:border-[#004B36]/30 transition-colors flex flex-col group bg-stone-50/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <FileText className="text-[#004B36]" size={24} />
                  </div>
                  <span className="text-xs font-bold text-stone-500 bg-stone-200/50 px-2.5 py-1 rounded-md">{resource.type}</span>
                </div>
                <h3 className="font-bold text-stone-900 mb-1">{resource.title}</h3>
                <p className="text-sm font-medium text-stone-500 mb-6">{resource.size}</p>
                <button className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:text-[#004B36] hover:border-[#004B36]/30 transition-colors group-hover:shadow-sm">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-full py-12 text-center text-stone-500 font-medium">
                No resources found matching your search.
              </div>
            )}
          </div>
        </div>
      )}
"""

content = re.sub(r'<\/div>\s*\)\}\s*<\/main>', '</div> )}' + end_resources + '\n</main>', content)

open('src/pages/LibraryDashboard.tsx', 'w').write(content)
