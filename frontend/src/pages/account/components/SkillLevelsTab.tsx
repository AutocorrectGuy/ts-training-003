
// const levelsData = [
//   {
//     "skillName"
//   }
// ]

const SkillLevelsTab = () => {
  return (
    <div className="w-full lg:w-4/12 px-4 lg:order-1">
      <div className="flex justify-center py-4 lg:pt-4 pt-8">
        <div className="mr-4 p-3 text-center w-[90px] whitespace-nowrap">
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold uppercase tracking-wide text-neutral-200 bg-[#1F6E42] mx-auto">
            2
          </span>
          <span className="text-sm text-gray-500">Excel</span>
        </div>
        <div className="mr-4 p-3 text-center w-[90px] whitespace-nowrap">
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold uppercase tracking-wide text-neutral-200 bg-[#2A548F] mx-auto">
            1
          </span>
          <span className="text-sm text-gray-500">Word</span>
        </div>
        <div className="lg:mr-4 p-3 text-center w-[90px] whitespace-nowrap">
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold uppercase tracking-wide text-neutral-200 bg-[#C54124] mx-auto">
            4
          </span>
          <span className="text-sm text-gray-500">PowerPoint</span>
        </div>
      </div>
    </div>
  )
}

export default SkillLevelsTab