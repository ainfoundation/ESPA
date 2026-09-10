import re
with open("src/components/MemberListView.jsx", "r") as f:
    content = f.read()

content = content.replace("import DraggableModal from './DraggableModal';", "import DraggableModal from './DraggableModal';\nimport MemberDetailsModal from './MemberDetailsModal';")

# Need to replace the inline selectedMember portal block.
# The block starts with {selectedMember && ( and ends before {memberToChangeRole && (
import_regex = r'\{selectedMember && \(\s*<Portal>.*?</Portal>\s*\)\}'
content = re.sub(
    import_regex,
    '{selectedMember && <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />}',
    content,
    flags=re.DOTALL
)

with open("src/components/MemberListView.jsx", "w") as f:
    f.write(content)
