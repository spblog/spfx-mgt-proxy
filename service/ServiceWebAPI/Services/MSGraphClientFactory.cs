using Microsoft.Graph;
using Microsoft.Identity.Web;
using System.Net.Http.Headers;

namespace ServiceWebAPI.Services
{
    public class MSGraphClientFactory
    {
        private readonly ITokenAcquisition _tokenAcquisition;
        // put all needed for your solution MS Graph scopes here
        private readonly string[] _scopes = new[] { "User.Read" };

        public MSGraphClientFactory(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        public GraphServiceClient CreateGraphClient()
        {
            return new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    async (requestMessage) =>
                    {
                        var result = await _tokenAcquisition.GetAccessTokenForUserAsync(_scopes);
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result);
                    }));
        }
    }
}
