export default function MapComponent() {
  return (
    <div>
      <header className="bg-gray-900">
        <nav className="flex items-center justify-between h-16">
          <div className="logo text-white text-lg font-semibold ml-6">Logo</div>
          <div className="account text-white mr-6">Account Name</div>
        </nav>
      </header>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex">
          <div className="w-2/3">
            <MapComponent />
          </div>
          <div className="w-1/3 p-4">
            <h2 className="text-xl font-medium mb-4">Settings</h2>
            <p className="text-gray-700">Placeholder for settings pane</p>
          </div>
        </div>
      </div>
    </div>
  );
}
