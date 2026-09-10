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

content = content.replace('{/* Catalog */} {filteredBooks.length === 0 ? ( <div className="text-center py-20 bg-white rounded-3xl border border-[#004B36]/10 "> <BookOpen size={48} className="mx-auto text-[#004B36]/40 mb-4" /> <h3 className="text-xl font-bold mb-2">No books found</h3> <p className="text-[#004B36]/60">Try adjusting your search or category filter.</p> </div> ) : viewMode === \'grid\' ? (', resources_view.strip())

open('src/pages/LibraryDashboard.tsx', 'w').write(content)
