import re
content = open('src/pages/LibraryDashboard.tsx').read()

resources_view = """
      {/* Catalog & Resources View */}
      {activeTab === 'catalog' ? (
        filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#004B36]/10 ">
            <BookOpen size={48} className="mx-auto text-[#004B36]/40 mb-4" />
            <h3 className="text-xl font-bold mb-2">No books found</h3>
            <p className="text-[#004B36]/60">Try adjusting your search or category filter.</p>
          </div>
        ) : viewMode === 'grid' ? ("""

content = re.sub(r'\{\/\*\s*Catalog\s*\*\/\}\s*\{filteredBooks\.length === 0 \? \(\s*<div className="text-center py-20 bg-white rounded-3xl border border-\[\#004B36\]\/10 ">\s*<BookOpen size=\{48\} className="mx-auto text-\[\#004B36\]\/40 mb-4" \/>\s*<h3 className="text-xl font-bold mb-2">No books found<\/h3>\s*<p className="text-\[\#004B36\]\/60">Try adjusting your search or category filter\.<\/p>\s*<\/div>\s*\) : viewMode === \'grid\' \? \(', resources_view.strip(), content, flags=re.DOTALL)

open('src/pages/LibraryDashboard.tsx', 'w').write(content)
