import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | movie-bookmark', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:movie-bookmark');
    assert.ok(route);
  });
});
