'use strict';

/**
 * The cookie service.
 */
app.service('CookieService', ['ipCookie', function(ipCookie) {
  return {

    /**
     * Setting the cookie.
     *
     * @param key The key of the cookie.
     * @param value The value of the cookie.
     */
    set: function(key, value) {
      ipCookie(key, value);
    },

    /**
     * Gets the cookie.
     *
     * @param key The key of the cookie.
     */
    get: function(key) {
      return ipCookie(key);
    }
  }
}]);
