import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | searchPage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:search-page');
    assert.ok(route);
  });
});
