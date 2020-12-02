import FirebaseAdapter from "emberfire/adapters/firebase";

export default FirebaseAdapter.extend({
  // Uncomment the following lines to enable offline persistence and multi-tab support
  enablePersistence: true,
  persistenceSettings: { synchronizeTabs: true },
});
