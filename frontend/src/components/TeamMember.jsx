

function TeamMember({ name, role, image }) {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt={name} className="rounded-full h-24 w-24 mb-2 object-contain" />
      <div className="text-lg font-bold text-center">{name}</div>
      <div className="text-gray-600 text-center">{role}</div>
    </div>
  );
}

export default TeamMember;
