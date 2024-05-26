const SectionFeatures = () => {
  return (
    <div className="max-w-[72rem] mx-auto bg-white rounded-lg  p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">
          Unleash the Power: Features That{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            Transcend the Ordinary!
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              undefinedhidden="true"
              alt="expense tracking"
              src="https://placehold.co/24x24"
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">Expense Tracking</h2>
          </div>
          <p className="text-zinc-600">
            Master your spending, gain valuable insights, and take control of
            your financial journey effortlessly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              undefinedhidden="true"
              alt="budgeting tools"
              src="https://placehold.co/24x24"
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">Budgeting Tools</h2>
          </div>
          <p className="text-zinc-600">
            Craft personalized budgets, receive real-time alerts, and stay in
            command of your money like a pro.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              undefinedhidden="true"
              alt="bill payment reminders"
              src="https://placehold.co/24x24"
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">Bill Payment Reminders</h2>
          </div>
          <p className="text-zinc-600">
            Say goodbye to late fees! Get timely reminders for bill payments and
            manage your expenses with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionFeatures;
